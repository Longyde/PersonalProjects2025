package com.longnotes.app.repo

import com.longnotes.app.data.AppDatabase
import com.longnotes.app.data.Folder
import kotlinx.coroutines.flow.Flow

class FoldersRepository(private val db: AppDatabase) {
    fun folders(): Flow<List<Folder>> = db.folderDao().getFolders()

    suspend fun add(name: String): Long =
        db.folderDao().insert(Folder(name = name))

    suspend fun rename(folder: Folder) =
        db.folderDao().update(folder)

    suspend fun delete(folder: Folder) =
        db.folderDao().delete(folder)
}
