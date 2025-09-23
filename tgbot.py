import logging
import sqlite3
from datetime import datetime, timedelta
from telegram import Update, ReplyKeyboardMarkup
from telegram.ext import Application, CommandHandler, MessageHandler, filters, ContextTypes, ConversationHandler
import asyncio
from threading import Thread

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)

# Токен бота (получите у @BotFather)
BOT_TOKEN = "8484739084:AAEFYcWm4aP96NXYsA_gMgvvrVHc4GSVDt8"

# Состояния для ConversationHandler
TASK, DEADLINE, REMINDER_DATE = range(3)

# Инициализация базы данных
def init_db():
    conn = sqlite3.connect('tasks.db', check_same_thread=False)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS tasks (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            chat_id INTEGER,
            task_name TEXT,
            deadline TEXT,
            reminder_date TEXT,
            created_at TEXT
        )
    ''')
    conn.commit()
    conn.close()

# Функция для добавления задачи в базу данных
def add_task(chat_id, task_name, deadline, reminder_date):
    conn = sqlite3.connect('tasks.db', check_same_thread=False)
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO tasks (chat_id, task_name, deadline, reminder_date, created_at)
        VALUES (?, ?, ?, ?, ?)
    ''', (chat_id, task_name, deadline, reminder_date, datetime.now().isoformat()))
    conn.commit()
    conn.close()

# Функция для получения задач, которые нужно напомнить
def get_tasks_to_remind():
    conn = sqlite3.connect('tasks.db', check_same_thread=False)
    cursor = conn.cursor()
    current_time = datetime.now().strftime('%Y-%m-%d %H:%M')
    cursor.execute('''
        SELECT * FROM tasks WHERE reminder_date <= ? AND reminder_date > ?
    ''', (current_time, (datetime.now() - timedelta(minutes=1)).strftime('%Y-%m-%d %H:%M')))
    tasks = cursor.fetchall()
    conn.close()
    return tasks

# Команда /start
async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    keyboard = [['/add_task', '/my_tasks']]
    reply_markup = ReplyKeyboardMarkup(keyboard, resize_keyboard=True)
    
    await update.message.reply_text(
        "Привет! Я бот для управления задачами.\n\n"
        "Команды:\n"
        "/add_task - добавить новую задачу\n"
        "/my_tasks - посмотреть мои задачи",
        reply_markup=reply_markup
    )

# Начало добавления задачи
async def add_task_start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "Введите название задачи:"
    )
    return TASK

# Получение названия задачи
async def get_task_name(update: Update, context: ContextTypes.DEFAULT_TYPE):
    context.user_data['task_name'] = update.message.text
    await update.message.reply_text(
        "Введите дату дедлайна в формате ГГГГ-ММ-ДД ЧЧ:ММ (например: 2024-12-31 23:59):"
    )
    return DEADLINE

# Получение дедлайна
async def get_deadline(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        deadline = datetime.strptime(update.message.text, '%Y-%m-%d %H:%M')
        context.user_data['deadline'] = update.message.text
        await update.message.reply_text(
            "Введите дату напоминания в формате ГГГГ-ММ-ДД ЧЧ:ММ:"
        )
        return REMINDER_DATE
    except ValueError:
        await update.message.reply_text("Неверный формат даты. Попробуйте снова в формате ГГГГ-ММ-ДД ЧЧ:ММ:")
        return DEADLINE

# Получение даты напоминания и сохранение задачи
async def get_reminder_date(update: Update, context: ContextTypes.DEFAULT_TYPE):
    try:
        reminder_date = datetime.strptime(update.message.text, '%Y-%m-%d %H:%M')
        chat_id = update.effective_chat.id
        task_name = context.user_data['task_name']
        deadline = context.user_data['deadline']
        
        add_task(chat_id, task_name, deadline, update.message.text)
        
        await update.message.reply_text(
            f"✅ Задача добавлена!\n"
            f"📝 Задача: {task_name}\n"
            f"📅 Дедлайн: {deadline}\n"
            f"⏰ Напоминание: {update.message.text}"
        )
        
        context.user_data.clear()
        return ConversationHandler.END
    except ValueError:
        await update.message.reply_text("Неверный формат даты. Попробуйте снова в формате ГГГГ-ММ-ДД ЧЧ:ММ:")
        return REMINDER_DATE

# Отмена диалога
async def cancel(update: Update, context: ContextTypes.DEFAULT_TYPE):
    context.user_data.clear()
    await update.message.reply_text("Диалог отменен.")
    return ConversationHandler.END

# Показать задачи пользователя
async def show_my_tasks(update: Update, context: ContextTypes.DEFAULT_TYPE):
    chat_id = update.effective_chat.id
    conn = sqlite3.connect('tasks.db', check_same_thread=False)
    cursor = conn.cursor()
    cursor.execute('SELECT task_name, deadline, reminder_date FROM tasks WHERE chat_id = ?', (chat_id,))
    tasks = cursor.fetchall()
    conn.close()
    
    if not tasks:
        await update.message.reply_text("У вас пока нет задач.")
        return
    
    tasks_text = "📋 Ваши задачи:\n\n"
    for i, (task_name, deadline, reminder_date) in enumerate(tasks, 1):
        tasks_text += f"{i}. {task_name}\n   📅 Дедлайн: {deadline}\n   ⏰ Напоминание: {reminder_date}\n\n"
    
    await update.message.reply_text(tasks_text)

# Функция для отправки напоминаний
async def send_reminders(app):
    while True:
        try:
            tasks = get_tasks_to_remind()
            for task in tasks:
                task_id, chat_id, task_name, deadline, reminder_date, created_at = task
                message = f"🔔 Напоминание!\n\n📝 Задача: {task_name}\n📅 Дедлайн: {deadline}"
                
                try:
                    await app.bot.send_message(chat_id=chat_id, text=message)
                    # Удаляем задачу после отправки напоминания
                    conn = sqlite3.connect('tasks.db', check_same_thread=False)
                    cursor = conn.cursor()
                    cursor.execute('DELETE FROM tasks WHERE id = ?', (task_id,))
                    conn.commit()
                    conn.close()
                    print(f"Отправлено напоминание для задачи: {task_name}")
                except Exception as e:
                    print(f"Ошибка отправки сообщения: {e}")
            
            await asyncio.sleep(60)  # Проверка каждую минуту
        except Exception as e:
            print(f"Ошибка в цикле напоминаний: {e}")
            await asyncio.sleep(60)

# Запуск бота
def main():
    # Инициализация базы данных
    init_db()
    
    # Создание приложения
    application = Application.builder().token(BOT_TOKEN).build()
    
    # Обработчики команд
    application.add_handler(CommandHandler("start", start))
    application.add_handler(CommandHandler("my_tasks", show_my_tasks))
    
    # ConversationHandler для добавления задачи
    conv_handler = ConversationHandler(
        entry_points=[CommandHandler('add_task', add_task_start)],
        states={
            TASK: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_task_name)],
            DEADLINE: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_deadline)],
            REMINDER_DATE: [MessageHandler(filters.TEXT & ~filters.COMMAND, get_reminder_date)],
        },
        fallbacks=[CommandHandler('cancel', cancel)],
    )
    
    application.add_handler(conv_handler)
    
    # Запуск бота
    print("Бот запущен...")
    
    # Запуск цикла напоминаний в отдельном потоке
    def run_reminders():
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        loop.run_until_complete(send_reminders(application))
    
    reminder_thread = Thread(target=run_reminders, daemon=True)
    reminder_thread.start()
    
    # Запуск бота
    application.run_polling()

if __name__ == '__main__':
    main()