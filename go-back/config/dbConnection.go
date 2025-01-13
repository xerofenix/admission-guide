package config

import (
	"admission-guide/models"
	"fmt"
	"log"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

// function for connecting to database
func ConnectDB() {
	connStr := os.Getenv("DB_URL")
	var err error
	DB, err = gorm.Open(postgres.Open(connStr), &gorm.Config{})
	if err != nil {
		log.Fatal("Error! connecting to database ", err)
	}
	fmt.Println("Databse connected successfully")

	//call AutoMigrate() function once | while running the project for the first time
	// AutoMigrate(DB)
}

// creating table using Migrate of GORM library
func AutoMigrate(conexn *gorm.DB) {
	err := conexn.Debug().AutoMigrate(
		&models.Feedback{},
	)
	if err != nil {
		log.Fatal("Error while automigration", err)
	}
}
