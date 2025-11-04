package com.longnotes.app.di

import android.app.Application
import androidx.room.Room
import com.longnotes.app.data.AppDatabase
import com.longnotes.app.data.ChecklistDao
import com.longnotes.app.data.FolderDao
import com.longnotes.app.data.MIGRATION_1_2
import com.longnotes.app.data.NoteDao
import dagger.Module
import dagger.Provides
import dagger.hilt.InstallIn
import dagger.hilt.components.SingletonComponent
import javax.inject.Singleton

@InstallIn(SingletonComponent::class)
@Module
class DatabaseModule {

    @Provides
    @Singleton
    fun provideAppDatabase(application: Application): AppDatabase {
        return Room.databaseBuilder(
            application,
            AppDatabase::class.java,
            "long_notes.db"
        ).addMigrations(MIGRATION_1_2).build()
    }

    @Provides
    fun provideNoteDao(appDatabase: AppDatabase): NoteDao {
        return appDatabase.noteDao()
    }

    @Provides
    fun provideFolderDao(appDatabase: AppDatabase): FolderDao {
        return appDatabase.folderDao()
    }

    @Provides
    fun provideChecklistDao(appDatabase: AppDatabase): ChecklistDao {
        return appDatabase.checklistDao()
    }
}
