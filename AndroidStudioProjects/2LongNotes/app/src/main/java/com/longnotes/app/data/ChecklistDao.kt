package com.longnotes.app.data

import androidx.room.*
import kotlinx.coroutines.flow.Flow

@Dao
interface ChecklistDao {
    @Query("SELECT * FROM checklist_items WHERE noteId = :noteId ORDER BY position ASC")
    fun itemsForNote(noteId: Long): Flow<List<ChecklistItem>>

    @Insert
    suspend fun insert(item: ChecklistItem): Long

    @Update
    suspend fun update(item: ChecklistItem)

    @Delete
    suspend fun delete(item: ChecklistItem)

    @Query("DELETE FROM checklist_items WHERE noteId = :noteId")
    suspend fun deleteForNote(noteId: Long)
}
