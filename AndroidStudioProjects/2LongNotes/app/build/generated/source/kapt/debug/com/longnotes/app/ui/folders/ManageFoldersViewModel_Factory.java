package com.longnotes.app.ui.folders;

import com.longnotes.app.repo.NotesRepository;
import dagger.internal.DaggerGenerated;
import dagger.internal.Factory;
import dagger.internal.QualifierMetadata;
import dagger.internal.ScopeMetadata;
import javax.annotation.processing.Generated;
import javax.inject.Provider;

@ScopeMetadata
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
public final class ManageFoldersViewModel_Factory implements Factory<ManageFoldersViewModel> {
  private final Provider<NotesRepository> notesRepositoryProvider;

  public ManageFoldersViewModel_Factory(Provider<NotesRepository> notesRepositoryProvider) {
    this.notesRepositoryProvider = notesRepositoryProvider;
  }

  @Override
  public ManageFoldersViewModel get() {
    return newInstance(notesRepositoryProvider.get());
  }

  public static ManageFoldersViewModel_Factory create(
      Provider<NotesRepository> notesRepositoryProvider) {
    return new ManageFoldersViewModel_Factory(notesRepositoryProvider);
  }

  public static ManageFoldersViewModel newInstance(NotesRepository notesRepository) {
    return new ManageFoldersViewModel(notesRepository);
  }
}
