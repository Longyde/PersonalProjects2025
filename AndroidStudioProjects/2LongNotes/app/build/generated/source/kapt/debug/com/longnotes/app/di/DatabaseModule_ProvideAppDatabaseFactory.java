package com.longnotes.app.di;

import android.app.Application;
import com.longnotes.app.data.AppDatabase;
import dagger.internal.DaggerGenerated;
import dagger.internal.Factory;
import dagger.internal.Preconditions;
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
public final class DatabaseModule_ProvideAppDatabaseFactory implements Factory<AppDatabase> {
  private final DatabaseModule module;

  private final Provider<Application> applicationProvider;

  public DatabaseModule_ProvideAppDatabaseFactory(DatabaseModule module,
      Provider<Application> applicationProvider) {
    this.module = module;
    this.applicationProvider = applicationProvider;
  }

  @Override
  public AppDatabase get() {
    return provideAppDatabase(module, applicationProvider.get());
  }

  public static DatabaseModule_ProvideAppDatabaseFactory create(DatabaseModule module,
      Provider<Application> applicationProvider) {
    return new DatabaseModule_ProvideAppDatabaseFactory(module, applicationProvider);
  }

  public static AppDatabase provideAppDatabase(DatabaseModule instance, Application application) {
    return Preconditions.checkNotNullFromProvides(instance.provideAppDatabase(application));
  }
}
