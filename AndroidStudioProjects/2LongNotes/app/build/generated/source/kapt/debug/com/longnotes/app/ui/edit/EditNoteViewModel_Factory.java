package com.longnotes.app.ui.edit;

import android.app.Application;
import androidx.lifecycle.SavedStateHandle;
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
public final class EditNoteViewModel_Factory implements Factory<EditNoteViewModel> {
  private final Provider<Application> applicationProvider;

  private final Provider<NotesRepository> notesRepositoryProvider;

  private final Provider<SavedStateHandle> savedStateHandleProvider;

  public EditNoteViewModel_Factory(Provider<Application> applicationProvider,
      Provider<NotesRepository> notesRepositoryProvider,
      Provider<SavedStateHandle> savedStateHandleProvider) {
    this.applicationProvider = applicationProvider;
    this.notesRepositoryProvider = notesRepositoryProvider;
    this.savedStateHandleProvider = savedStateHandleProvider;
  }

  @Override
  public EditNoteViewModel get() {
    return newInstance(applicationProvider.get(), notesRepositoryProvider.get(), savedStateHandleProvider.get());
  }

  public static EditNoteViewModel_Factory create(Provider<Application> applicationProvider,
      Provider<NotesRepository> notesRepositoryProvider,
      Provider<SavedStateHandle> savedStateHandleProvider) {
    return new EditNoteViewModel_Factory(applicationProvider, notesRepositoryProvider, savedStateHandleProvider);
  }

  public static EditNoteViewModel newInstance(Application application,
      NotesRepository notesRepository, SavedStateHandle savedStateHandle) {
    return new EditNoteViewModel(application, notesRepository, savedStateHandle);
  }
}
