import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    kotlin("jvm") version "2.0.21"
    id("java-gradle-plugin")
}

repositories {
    mavenCentral()
}

gradlePlugin {
    plugins {
        create("reactSettingsPlugin") {
            id = "com.facebook.react.settings"
            implementationClass = "expo.plugins.ReactSettingsPlugin"
        }
    }
}
