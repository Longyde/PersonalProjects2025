package com.longnotes.app.di;

import com.longnotes.app.data.AppDatabase;
import com.longnotes.app.data.FolderDao;
import dagger.internal.DaggerGenerated;
import dagger.internal.Factory;
import dagger.internal.Preconditions;
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
public final class DatabaseModule_ProvideFolderDaoFactory implements Factory<FolderDao> {
  private final DatabaseModule module;

  private final Provider<AppDatabase> appDatabaseProvider;

  public DatabaseModule_ProvideFolderDaoFactory(DatabaseModule module,
      Provider<AppDatabase> appDatabaseProvider) {
    this.module = module;
    this.appDatabaseProvider = appDatabaseProvider;
  }

  @Override
  public FolderDao get() {
    return provideFolderDao(module, appDatabaseProvider.get());
  }

  public static DatabaseModule_ProvideFolderDaoFactory create(DatabaseModule module,
      Provider<AppDatabase> appDatabaseProvider) {
    return new DatabaseModule_ProvideFolderDaoFactory(module, appDatabaseProvider);
  }

  public static FolderDao provideFolderDao(DatabaseModule instance, AppDatabase appDatabase) {
    return Preconditions.checkNotNullFromProvides(instance.provideFolderDao(appDatabase));
  }
}
