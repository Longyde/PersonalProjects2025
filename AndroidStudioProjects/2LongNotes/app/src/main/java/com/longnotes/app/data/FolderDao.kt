package com.longnotes.app.data

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface FolderDao {
    @Query("SELECT * FROM folders ORDER BY name ASC")
    fun getFolders(): Flow<List<Folder>>

    @Insert
    suspend fun insert(folder: Folder): Long

    @Update
    suspend fun update(folder: Folder)

    @Delete
    suspend fun delete(folder: Folder)
}
