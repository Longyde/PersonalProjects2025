package com.longnotes.app.repo

import com.longnotes.app.data.*
import kotlinx.coroutines.flow.Flow
import javax.inject.Inject
import javax.inject.Singleton

@Singleton
class NotesRepository @Inject constructor(
    private val noteDao: NoteDao,
    private val folderDao: FolderDao,
    private val checklistDao: ChecklistDao
) {

    fun notes(): Flow<List<Note>> = noteDao.getAll()
    fun notesInFolder(folderId: Long): Flow<List<Note>> = noteDao.getByFolder(folderId)
    fun note(id: Long): Flow<Note?> = noteDao.getById(id)
    fun search(query: String): Flow<List<Note>> = noteDao.search("%$query%")

    suspend fun add(note: Note): Long = noteDao.insert(
        note.copy(
            createdAt = System.currentTimeMillis(),
            updatedAt = System.currentTimeMillis()
        )
    )

    suspend fun update(note: Note) =
        noteDao.update(note.copy(updatedAt = System.currentTimeMillis()))

    suspend fun delete(note: Note) = noteDao.delete(note)

    fun checklist(noteId: Long): Flow<List<ChecklistItem>> = checklistDao.itemsForNote(noteId)

    suspend fun replaceChecklist(noteId: Long, items: List<ChecklistItem>) {
        checklistDao.deleteForNote(noteId)
        items.forEachIndexed { index, item ->
            checklistDao.insert(item.copy(noteId = noteId, position = index))
        }
    }

    fun folders(): Flow<List<Folder>> = folderDao.getFolders()

    suspend fun addFolder(folder: Folder) = folderDao.insert(folder)

    suspend fun updateFolder(folder: Folder) = folderDao.update(folder)

    suspend fun deleteFolder(folder: Folder) = folderDao.delete(folder)
}
