package models

import "time"

type Feedback struct {
	Id           uint      `json:"id"`
	Name         string    `json:"name"`
	Email        string    `json:"email"`
	FeedbackText string    `json:"feedback_text"`
	CreatedAt    time.Time `json:"created_at" `
	UpdatedAt    time.Time `json:"updated_at"`
}
