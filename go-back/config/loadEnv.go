package config

import (
	"fmt"

	"github.com/joho/godotenv"
)

// loading .env file
func LoadEnv() {

	if err := godotenv.Load(); err != nil {
		fmt.Println("Error! loading env", err)
	}
}
