// /src/App.jsx
import React, { useEffect, useMemo, useState } from "react";
import ChecklistForm from "./ChecklistForm";
import Checklist from "./Checklist";
import { defaultChecklists } from "./data/checklists";

/**
 * DoneGo - MVP main App
 * Features:
 *  - My lists (saved in localStorage)
 *  - Library (defaultChecklists) — can copy a library checklist into My lists
 *  - Create, add task, toggle, remove, edit title, reset tasks
 */

const STORAGE_KEY = "donego.v1";

function uid(prefix = "") {
  return `${prefix}${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
}

function deepCloneWithNewIds(libChecklist) {
  const newChecklistId = uid("c_");
  const tasks = (libChecklist.tasks || []).map(() => null);
  let i = 0;
  const newTasks = (libChecklist.tasks || []).map((t) => ({
    id: uid("t_"),
    text: t.text,
    done: false
  }));
  return {
    id: newChecklistId,
    title: libChecklist.title,
    category: libChecklist.category || "Библиотека",
    tasks: newTasks
  };
}

export default function App() {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        // initial state: no myLists, library from defaultChecklists
        return {
          myLists: [],
          library: defaultChecklists
        };
      }
      return JSON.parse(raw);
    } catch {
      return {
        myLists: [],
        library: defaultChecklists
      };
    }
  });

  // persist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  // UI state
  const [view, setView] = useState("my"); // 'my' | 'library'
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Все");

  useEffect(() => {
    // update search/category when switching views
    setQuery("");
    setSelectedCategory("Все");
  }, [view]);

  const categories = useMemo(() => {
    const cats = new Set(defaultChecklists.map((c) => c.category || "Библиотека"));
    return ["Все", ...Array.from(cats)];
  }, []);

  // handlers for My Lists
  const createChecklist = (title) => {
    const newC = {
      id: uid("c_"),
      title: title.trim(),
      category: "Мои",
      tasks: []
    };
    setState((prev) => ({ ...prev, myLists: [newC, ...prev.myLists] }));
  };

  const removeChecklist = (id) => {
    if (!confirm("Удалить чек-лист?")) return;
    setState((prev) => ({ ...prev, myLists: prev.myLists.filter((c) => c.id !== id) }));
  };

  const addTask = (checklistId, text) => {
    setState((prev) => ({
      ...prev,
      myLists: prev.myLists.map((c) =>
        c.id === checklistId
          ? { ...c, tasks: [{ id: uid("t_"), text, done: false }, ...c.tasks] }
          : c
      )
    }));
  };

  const toggleTask = (checklistId, taskId) => {
    setState((prev) => ({
      ...prev,
      myLists: prev.myLists.map((c) =>
        c.id === checklistId ? { ...c, tasks: c.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)) } : c
      )
    }));
  };

  const removeTask = (checklistId, taskId) => {
    setState((prev) => ({
      ...prev,
      myLists: prev.myLists.map((c) => (c.id === checklistId ? { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) } : c))
    }));
  };

  const editTitle = (checklistId, newTitle) => {
    setState((prev) => ({
      ...prev,
      myLists: prev.myLists.map((c) => (c.id === checklistId ? { ...c, title: newTitle } : c))
    }));
  };

  const resetTasks = (checklistId) => {
    if (!confirm("Сбросить все отметки в этом чек-листе?")) return;
    setState((prev) => ({
      ...prev,
      myLists: prev.myLists.map((c) => (c.id === checklistId ? { ...c, tasks: c.tasks.map((t) => ({ ...t, done: false })) } : c))
    }));
  };

  // library actions
  const copyFromLibrary = (libId) => {
    const lib = state.library.find((l) => l.id === libId);
    if (!lib) return;
    const clone = deepCloneWithNewIds(lib);
    setState((prev) => ({ ...prev, myLists: [clone, ...prev.myLists] }));
    setView("my");
  };

  const filteredLibrary = useMemo(() => {
    const q = query.trim().toLowerCase();
    return state.library.filter((l) => {
      if (selectedCategory !== "Все" && (l.category || "Библиотека") !== selectedCategory) return false;
      if (!q) return true;
      return l.title.toLowerCase().includes(q) || (l.tasks || []).some((t) => t.text.toLowerCase().includes(q));
    });
  }, [state.library, query, selectedCategory]);

  const filteredMyLists = useMemo(() => {
    const q = query.trim().toLowerCase();
    return state.myLists.filter((l) => {
      if (selectedCategory !== "Все" && selectedCategory !== "Мои" && l.category !== selectedCategory) return false;
      if (selectedCategory === "Мои" && selectedCategory !== "Все" && l.category !== "Мои") return false;
      if (!q) return true;
      return l.title.toLowerCase().includes(q) || (l.tasks || []).some((t) => t.text.toLowerCase().includes(q));
    });
  }, [state.myLists, query, selectedCategory]);

  // small helpers
  const totalTasks = state.myLists.reduce((s, c) => s + c.tasks.length, 0);
  const totalLists = state.myLists.length;

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold">DoneGo</h1>
            <p className="text-sm text-slate-500">Чек-листы и мини-дайджесты для любого случая — офлайн и просто.</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
              <span className="px-2 py-1 rounded-md bg-slate-50 border border-slate-100">Списков: {totalLists}</span>
              <span className="px-2 py-1 rounded-md bg-slate-50 border border-slate-100">Задач: {totalTasks}</span>
            </div>
            <button
              onClick={() => {
                setView((v) => (v === "my" ? "library" : "my"));
                setQuery("");
                setSelectedCategory("Все");
              }}
              className="btn bg-white border border-slate-200 shadow-sm"
            >
              {view === "my" ? "Библиотека" : "Мои списки"}
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left column: create + filters */}
          <aside className="lg:col-span-1 space-y-4">
            <div className="card">
              <h2 className="text-lg font-semibold mb-2">Новый чек-лист</h2>
              <ChecklistForm onCreate={createChecklist} />
            </div>

            <div className="card">
              <h3 className="text-sm font-medium mb-2">Поиск</h3>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="По названию или задаче..."
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-violet-300"
              />
              <h4 className="text-sm font-medium mt-4 mb-2">Категория</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2 py-1 text-sm rounded-md ${selectedCategory === cat ? "bg-violet-600 text-white" : "bg-slate-50 border border-slate-100"}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="card hidden md:block">
              <h3 className="text-sm font-medium mb-2">Инструкция</h3>
              <ol className="text-sm text-slate-500 space-y-2">
                <li>• Создавайте свои списки слева.</li>
                <li>• Импортируйте готовые чек-листы из библиотеки.</li>
                <li>• Все сохраняется в браузере (localStorage).</li>
              </ol>
            </div>
          </aside>

          {/* Right / main area */}
          <section className="lg:col-span-3 space-y-4">
            {/* Tabs */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setView("my")}
                  className={`px-3 py-1 rounded-md text-sm ${view === "my" ? "bg-violet-600 text-white" : "bg-slate-50 border border-slate-100"}`}
                >
                  Мои списки
                </button>
                <button
                  onClick={() => setView("library")}
                  className={`px-3 py-1 rounded-md text-sm ${view === "library" ? "bg-violet-600 text-white" : "bg-slate-50 border border-slate-100"}`}
                >
                  Библиотека
                </button>
              </div>

              <div className="text-sm text-slate-500">
                {view === "my" ? "Управляйте вашими списками" : "Добавьте готовый чек-лист в свои"}
              </div>
            </div>

            {/* Content */}
            {view === "my" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredMyLists.length === 0 ? (
                  <div className="card col-span-full text-center text-slate-500">
                    У вас пока нет списков — создайте новый или импортируйте из библиотеки.
                  </div>
                ) : (
                  filteredMyLists.map((cl) => (
                    <div key={cl.id} className="card">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold">{cl.title}</h3>
                          <p className="text-xs text-slate-400 mt-1">{cl.tasks.length} задач</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => removeChecklist(cl.id)}
                            className="px-2 py-1 rounded-md bg-red-50 text-red-600 text-sm"
                          >
                            Удалить
                          </button>
                        </div>
                      </div>

                      <Checklist
                        checklist={cl}
                        onAddTask={(text) => addTask(cl.id, text)}
                        onToggleTask={(taskId) => toggleTask(cl.id, taskId)}
                        onRemoveTask={(taskId) => removeTask(cl.id, taskId)}
                        onEditTitle={(newTitle) => editTitle(cl.id, newTitle)}
                        onReset={() => resetTasks(cl.id)}
                      />
                    </div>
                  ))
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredLibrary.length === 0 ? (
                  <div className="card col-span-full text-center text-slate-500">Нет чек-листов в библиотеке.</div>
                ) : (
                  filteredLibrary.map((lib) => (
                    <div key={lib.id} className="card">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-lg font-semibold">{lib.title}</h3>
                          <p className="text-xs text-slate-400 mt-1">{lib.category}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => copyFromLibrary(lib.id)}
                            className="px-3 py-1 rounded-md bg-violet-600 text-white text-sm"
                          >
                            Добавить в мои
                          </button>
                        </div>
                      </div>

                      <ul className="space-y-2">
                        {(lib.tasks || []).slice(0, 6).map((t, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-sm text-slate-700">
                            <span className="w-4 h-4 inline-block" />
                            <span>{t.text}</span>
                          </li>
                        ))}
                        {lib.tasks && lib.tasks.length > 6 && (
                          <li className="text-xs text-slate-400">...ещё {lib.tasks.length - 6} пунктов</li>
                        )}
                      </ul>
                    </div>
                  ))
                )}
              </div>
            )}
          </section>
        </main>

        <footer className="mt-8 text-center text-xs text-slate-400">DoneGo · оффлайн-прототип · localStorage</footer>
      </div>
    </div>
  );
}
