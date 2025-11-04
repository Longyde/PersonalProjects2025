package com.longnotes.app.data

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface NoteDao {
    @Query("SELECT * FROM notes ORDER BY pinned DESC, updatedAt DESC")
    fun getAll(): Flow<List<Note>>

    @Query("SELECT * FROM notes WHERE folderId = :folderId ORDER BY pinned DESC, updatedAt DESC")
    fun getByFolder(folderId: Long): Flow<List<Note>>

    @Query("SELECT * FROM notes WHERE id = :id")
    fun getById(id: Long): Flow<Note?>

    @Insert
    suspend fun insert(note: Note): Long

    @Update
    suspend fun update(note: Note)

    @Delete
    suspend fun delete(note: Note)

    @Query("SELECT * FROM notes WHERE title LIKE :q OR content LIKE :q ORDER BY pinned DESC, updatedAt DESC")
    fun search(q: String): Flow<List<Note>>
}
