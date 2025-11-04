package com.longnotes.app.repo;

import com.longnotes.app.data.ChecklistDao;
import com.longnotes.app.data.FolderDao;
import com.longnotes.app.data.NoteDao;
import dagger.internal.DaggerGenerated;
import dagger.internal.Factory;
import dagger.internal.QualifierMetadata;
import dagger.internal.ScopeMetadata;
import javax.annotation.processing.Generated;
import javax.inject.Provider;

@ScopeMetadata("javax.inject.Singleton")
@QualifierMetadata
@DaggerGenerated
@Generated(
    value = "dagger.internal.codegen.ComponentProcessor",
    comments = "https://dagger.dev"
)
@SuppressWarnings({
    "unchecked",
    "rawtypes",
    "KotlinInternal",
    "KotlinInternalInJava",
    "cast"
})
public final class NotesRepository_Factory implements Factory<NotesRepository> {
  private final Provider<NoteDao> noteDaoProvider;

  private final Provider<FolderDao> folderDaoProvider;

  private final Provider<ChecklistDao> checklistDaoProvider;

  public NotesRepository_Factory(Provider<NoteDao> noteDaoProvider,
      Provider<FolderDao> folderDaoProvider, Provider<ChecklistDao> checklistDaoProvider) {
    this.noteDaoProvider = noteDaoProvider;
    this.folderDaoProvider = folderDaoProvider;
    this.checklistDaoProvider = checklistDaoProvider;
  }

  @Override
  public NotesRepository get() {
    return newInstance(noteDaoProvider.get(), folderDaoProvider.get(), checklistDaoProvider.get());
  }

  public static NotesRepository_Factory create(Provider<NoteDao> noteDaoProvider,
      Provider<FolderDao> folderDaoProvider, Provider<ChecklistDao> checklistDaoProvider) {
    return new NotesRepository_Factory(noteDaoProvider, folderDaoProvider, checklistDaoProvider);
  }

  public static NotesRepository newInstance(NoteDao noteDao, FolderDao folderDao,
      ChecklistDao checklistDao) {
    return new NotesRepository(noteDao, folderDao, checklistDao);
  }
}
