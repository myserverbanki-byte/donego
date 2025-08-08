// /src/ChecklistForm.jsx
import React, { useState } from "react";

export default function ChecklistForm({ onCreate }) {
  const [title, setTitle] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const t = title.trim();
    if (!t) return;
    onCreate(t);
    setTitle("");
  };

  return (
    <form onSubmit={submit} className="space-y-3">
      <label className="block text-sm font-medium text-slate-600">Название чек-листа</label>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Например: Список покупок"
        className="w-full px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-300"
      />
      <div className="flex gap-2">
        <button type="submit" className="btn bg-violet-600 text-white">
          Создать
        </button>
        <button
          type="button"
          onClick={() => setTitle("")}
          className="btn bg-slate-50 border border-slate-200"
        >
          Очистить
        </button>
      </div>
    </form>
  );
}
