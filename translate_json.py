import json

def remove_ampersands(s: str) -> str:
    """Удаляет все символы & из строки"""
    return s.replace("&", "")

def recursive_remove(obj):
    if isinstance(obj, dict):
        return {k: recursive_remove(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [recursive_remove(x) for x in obj]
    elif isinstance(obj, str):
        fixed = remove_ampersands(obj)
        if fixed != obj:
            print(f"Удалено: {obj[:80]} → {fixed[:80]}")
        return fixed
    else:
        return obj

print("⏳ Удаляем все & ...")

with open("output_fixed.json", "r", encoding="utf-8") as f:
    data = json.load(f)

fixed_data = recursive_remove(data)

with open("output_no_amp.json", "w", encoding="utf-8") as f:
    json.dump(fixed_data, f, ensure_ascii=False, indent=2)

print("✅ Готово! Все амперсанды убраны → output_no_amp.json")
