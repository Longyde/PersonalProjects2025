package com.longnotes.app.ui.main;

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
public final class MainViewModel_Factory implements Factory<MainViewModel> {
  private final Provider<NotesRepository> notesRepositoryProvider;

  public MainViewModel_Factory(Provider<NotesRepository> notesRepositoryProvider) {
    this.notesRepositoryProvider = notesRepositoryProvider;
  }

  @Override
  public MainViewModel get() {
    return newInstance(notesRepositoryProvider.get());
  }

  public static MainViewModel_Factory create(Provider<NotesRepository> notesRepositoryProvider) {
    return new MainViewModel_Factory(notesRepositoryProvider);
  }

  public static MainViewModel newInstance(NotesRepository notesRepository) {
    return new MainViewModel(notesRepository);
  }
}
