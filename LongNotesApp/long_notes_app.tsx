import React, { useState, useEffect } from 'react';
import { Trash2, Edit, Plus, Folder, Search, Grid, List, Save, X, ChevronLeft, Menu, Check } from 'lucide-react';

// Add mobile viewport styles
const MobileStyles = () => (
  <style>{`
    * {
      -webkit-tap-highlight-color: transparent;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      user-select: none;
    }
    html, body, #root {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      overflow: hidden;
      position: fixed;
    }
    input, textarea {
      -webkit-user-select: text;
      user-select: text;
    }
  `}</style>
);

const LongNotes = () => {
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([{ id: 'all', name: 'All Notes', count: 0 }]);
  const [currentView, setCurrentView] = useState('list');
  const [currentFolder, setCurrentFolder] = useState('all');
  const [showEditor, setShowEditor] = useState(false);
  const [showFolderManager, setShowFolderManager] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [showMenu, setShowMenu] = useState(false);

  const colors = [
    { name: 'Yellow', value: '#FFF9C4', dark: '#F9A825' },
    { name: 'Orange', value: '#FFE0B2', dark: '#F57C00' },
    { name: 'Red', value: '#FFCDD2', dark: '#E53935' },
    { name: 'Pink', value: '#F8BBD0', dark: '#E91E63' },
    { name: 'Purple', value: '#E1BEE7', dark: '#8E24AA' },
    { name: 'Blue', value: '#BBDEFB', dark: '#1E88E5' },
    { name: 'Cyan', value: '#B2EBF2', dark: '#00ACC1' },
    { name: 'Green', value: '#C8E6C9', dark: '#43A047' },
    { name: 'Gray', value: '#E0E0E0', dark: '#757575' },
  ];

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [notes, folders]);

  const loadData = async () => {
    try {
      const notesData = await window.storage.get('longnotes_notes');
      const foldersData = await window.storage.get('longnotes_folders');
      
      if (notesData) setNotes(JSON.parse(notesData.value));
      if (foldersData) setFolders(JSON.parse(foldersData.value));
    } catch (error) {
      console.log('No saved data found');
    }
  };

  const saveData = async () => {
    try {
      await window.storage.set('longnotes_notes', JSON.stringify(notes));
      await window.storage.set('longnotes_folders', JSON.stringify(folders));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const createNote = (noteData) => {
    const newNote = {
      id: Date.now().toString(),
      title: noteData.title || 'Untitled',
      content: noteData.content || '',
      color: noteData.color || colors[0].value,
      folder: noteData.folder || 'all',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      pinned: false,
    };
    setNotes([newNote, ...notes]);
    updateFolderCount();
  };

  const updateNote = (id, updates) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, ...updates, updatedAt: new Date().toISOString() } : note
    ));
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
    updateFolderCount();
  };

  const deleteSelectedNotes = () => {
    setNotes(notes.filter(note => !selectedNotes.includes(note.id)));
    setSelectedNotes([]);
    updateFolderCount();
  };

  const createFolder = (name) => {
    const newFolder = {
      id: Date.now().toString(),
      name: name,
      count: 0,
    };
    setFolders([...folders, newFolder]);
  };

  const updateFolderCount = () => {
    const updatedFolders = folders.map(folder => ({
      ...folder,
      count: folder.id === 'all' 
        ? notes.length 
        : notes.filter(n => n.folder === folder.id).length
    }));
    setFolders(updatedFolders);
  };

  const filteredNotes = notes.filter(note => {
    const matchesFolder = currentFolder === 'all' || note.folder === currentFolder;
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  }).sort((a, b) => {
    if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  const toggleSelection = (id) => {
    setSelectedNotes(prev => 
      prev.includes(id) ? prev.filter(nid => nid !== id) : [...prev, id]
    );
  };

  if (showEditor) {
    return <NoteEditor 
      note={editingNote}
      colors={colors}
      folders={folders}
      onSave={(noteData) => {
        if (editingNote) {
          updateNote(editingNote.id, noteData);
        } else {
          createNote(noteData);
        }
        setShowEditor(false);
        setEditingNote(null);
      }}
      onClose={() => {
        setShowEditor(false);
        setEditingNote(null);
      }}
    />;
  }

  if (showFolderManager) {
    return <FolderManager
      folders={folders.filter(f => f.id !== 'all')}
      onCreateFolder={createFolder}
      onDeleteFolder={(id) => {
        setFolders(folders.filter(f => f.id !== id));
        setNotes(notes.map(n => n.folder === id ? { ...n, folder: 'all' } : n));
      }}
      onClose={() => setShowFolderManager(false)}
    />;
  }

  return (
    <>
      <MobileStyles />
      <div className="h-screen w-screen bg-gray-100 flex flex-col overflow-hidden fixed inset-0">
      {/* Header */}
      <div className="bg-blue-600 text-white shadow-lg flex-shrink-0">
        <div className="flex items-center justify-between p-4 pb-3">
          <div className="flex items-center gap-3">
            <button onClick={() => setShowMenu(!showMenu)} className="p-2 -ml-2 active:bg-blue-700 rounded-lg">
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold">Long Notes</h1>
          </div>
          <button 
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 active:bg-blue-700 rounded-lg"
          >
            {viewMode === 'grid' ? <List size={22} /> : <Grid size={22} />}
          </button>
        </div>
        
        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 text-base"
            />
          </div>
        </div>
      </div>

      {/* Side Menu */}
      {showMenu && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowMenu(false)}>
          <div className="w-72 bg-white h-full shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 bg-blue-600 text-white">
              <h2 className="text-xl font-bold">Folders</h2>
            </div>
            <div className="p-3">
              {folders.map(folder => (
                <button
                  key={folder.id}
                  onClick={() => {
                    setCurrentFolder(folder.id);
                    setShowMenu(false);
                  }}
                  className={`w-full text-left p-4 rounded-lg flex items-center justify-between mb-2 active:bg-gray-200 ${
                    currentFolder === folder.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Folder size={20} />
                    <span className="text-base">{folder.name}</span>
                  </div>
                  <span className="text-sm text-gray-500 font-semibold">{folder.count}</span>
                </button>
              ))}
              <button
                onClick={() => {
                  setShowMenu(false);
                  setShowFolderManager(true);
                }}
                className="w-full text-left p-4 rounded-lg flex items-center gap-3 text-blue-600 hover:bg-gray-100 mt-3 active:bg-gray-200"
              >
                <Plus size={20} />
                <span className="text-base font-medium">Manage Folders</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selection Actions */}
      {selectedNotes.length > 0 && (
        <div className="bg-blue-500 text-white p-4 flex items-center justify-between flex-shrink-0">
          <span className="text-base font-medium">{selectedNotes.length} selected</span>
          <div className="flex gap-3">
            <button 
              onClick={deleteSelectedNotes}
              className="px-5 py-2.5 bg-red-600 rounded-lg active:bg-red-700 font-medium"
            >
              Delete
            </button>
            <button 
              onClick={() => setSelectedNotes([])}
              className="px-5 py-2.5 bg-gray-600 rounded-lg active:bg-gray-700 font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Notes Grid/List */}
      <div className="flex-1 overflow-auto p-4 pb-24">
        {filteredNotes.length === 0 ? (
          <div className="text-center text-gray-500 mt-32">
            <p className="text-xl mb-2">No notes yet</p>
            <p className="text-base">Tap the + button to create one</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-2 gap-4' 
            : 'flex flex-col gap-3'
          }>
            {filteredNotes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                viewMode={viewMode}
                isSelected={selectedNotes.includes(note.id)}
                onSelect={() => toggleSelection(note.id)}
                onEdit={() => {
                  setEditingNote(note);
                  setShowEditor(true);
                }}
                onDelete={() => deleteNote(note.id)}
                onPin={() => updateNote(note.id, { pinned: !note.pinned })}
              />
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        onClick={() => setShowEditor(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-600 text-white rounded-full shadow-2xl flex items-center justify-center active:bg-blue-700 active:scale-95 transition-transform z-40"
      >
        <Plus size={32} />
      </button>
    </div>
    </>
  );
};

const NoteCard = ({ note, viewMode, isSelected, onSelect, onEdit, onDelete, onPin }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div
      className={`rounded-lg shadow p-3 relative cursor-pointer ${
        isSelected ? 'ring-2 ring-blue-500' : ''
      }`}
      style={{ backgroundColor: note.color }}
      onClick={() => isSelected ? onSelect() : onEdit()}
      onLongPress={onSelect}
    >
      {note.pinned && (
        <div className="absolute top-2 right-2 text-xs bg-black bg-opacity-20 px-2 py-1 rounded">
          📌
        </div>
      )}
      
      <h3 className="font-semibold text-gray-800 mb-1 line-clamp-2">{note.title}</h3>
      <p className="text-sm text-gray-700 line-clamp-3">{note.content}</p>
      
      <div className="mt-2 flex justify-between items-center">
        <span className="text-xs text-gray-600">
          {new Date(note.updatedAt).toLocaleDateString()}
        </span>
        <div className="flex gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPin();
            }}
            className="p-1 hover:bg-black hover:bg-opacity-10 rounded"
          >
            📌
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1 hover:bg-black hover:bg-opacity-10 rounded"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm('Delete this note?')) onDelete();
            }}
            className="p-1 hover:bg-black hover:bg-opacity-10 rounded text-red-600"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const NoteEditor = ({ note, colors, folders, onSave, onClose }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [selectedColor, setSelectedColor] = useState(note?.color || colors[0].value);
  const [selectedFolder, setSelectedFolder] = useState(note?.folder || 'all');
  const [showColorPicker, setShowColorPicker] = useState(false);

  return (
    <div className="h-screen w-screen bg-white flex flex-col fixed inset-0 z-50">
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between flex-shrink-0 shadow-lg">
        <button onClick={onClose} className="p-2 -ml-2 active:bg-blue-700 rounded-lg">
          <ChevronLeft size={28} />
        </button>
        <h2 className="text-xl font-bold">{note ? 'Edit Note' : 'New Note'}</h2>
        <button
          onClick={() => {
            if (title.trim() || content.trim()) {
              onSave({ title, content, color: selectedColor, folder: selectedFolder });
            } else {
              alert('Please add a title or content');
            }
          }}
          className="p-2 -mr-2 active:bg-blue-700 rounded-lg"
        >
          <Save size={28} />
        </button>
      </div>

      <div className="flex-1 overflow-auto" style={{ backgroundColor: selectedColor }}>
        <div className="p-5">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-2xl font-bold bg-transparent border-none outline-none mb-4 placeholder-gray-600"
            style={{ minHeight: '40px' }}
          />
          <textarea
            placeholder="Start typing..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-96 bg-transparent border-none outline-none resize-none placeholder-gray-600 text-base leading-relaxed"
          />
        </div>
      </div>

      <div className="p-5 border-t bg-white flex-shrink-0 safe-area-bottom">
        <div className="mb-4">
          <label className="text-sm text-gray-600 mb-2 block font-medium">Folder</label>
          <select
            value={selectedFolder}
            onChange={(e) => setSelectedFolder(e.target.value)}
            className="w-full p-3 border rounded-lg text-base"
          >
            {folders.map(folder => (
              <option key={folder.id} value={folder.id}>{folder.name}</option>
            ))}
          </select>
        </div>
        
        <button
          onClick={() => setShowColorPicker(!showColorPicker)}
          className="w-full p-4 bg-gray-100 rounded-lg flex items-center justify-between active:bg-gray-200"
        >
          <span className="font-medium">Change Color</span>
          <div className="w-8 h-8 rounded-lg border-2 shadow-sm" style={{ backgroundColor: selectedColor }} />
        </button>
        
        {showColorPicker && (
          <div className="grid grid-cols-5 gap-3 mt-4">
            {colors.map(color => (
              <button
                key={color.value}
                onClick={() => {
                  setSelectedColor(color.value);
                  setShowColorPicker(false);
                }}
                className="w-full aspect-square rounded-lg border-2 shadow-md active:scale-95 transition-transform"
                style={{ backgroundColor: color.value }}
              >
                {selectedColor === color.value && <Check className="mx-auto" size={24} />}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const FolderManager = ({ folders, onCreateFolder, onDeleteFolder, onClose }) => {
  const [newFolderName, setNewFolderName] = useState('');

  return (
    <div className="h-screen bg-white flex flex-col">
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <button onClick={onClose} className="p-1">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-bold">Manage Folders</h2>
        <div className="w-6" />
      </div>

      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="New folder name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={() => {
              if (newFolderName.trim()) {
                onCreateFolder(newFolderName.trim());
                setNewFolderName('');
              }
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="space-y-2">
          {folders.map(folder => (
            <div key={folder.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <Folder size={20} />
                <span>{folder.name}</span>
              </div>
              <button
                onClick={() => {
                  if (confirm(`Delete folder "${folder.name}"?`)) {
                    onDeleteFolder(folder.id);
                  }
                }}
                className="p-2 text-red-600 hover:bg-red-50 rounded"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LongNotes;