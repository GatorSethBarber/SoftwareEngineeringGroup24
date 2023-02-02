package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

var BioData = make([]Bio, 0) // Slice used as data store
// Uncomment this when running
// func main() {
// 	fmt.Println("Hello, world")
// 	Run()
// 	// Create router

// }

// Set up a server using a function
func Run() {
	router := mux.NewRouter()
	router.HandleFunc("/create", create).Methods("POST")
	router.HandleFunc("/read", read).Methods("GET")
	router.HandleFunc("/update", update).Methods("PUT")
	router.HandleFunc("/delete", delete_).Methods("DELETE")

	BioData = append(BioData, Bio{"Seth", 99})

	err := http.ListenAndServe(":8080", router)
	if err != nil {
		log.Fatalln("There's an error with the server,", err)
	}
	fmt.Println("Listening on port 8080")
}

type Bio struct {
	Name string `json:"name"`
	Age  int    `json:"age"`
}

/*
func example(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
}
*/

// Example POST request
func create(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	writer.WriteHeader(http.StatusOK)
	var human Bio
	err := json.NewDecoder(request.Body).Decode(&human)

	// Check for error
	if err != nil {
		log.Fatalln("There was an error decoding the request body into the struct")
	}

	BioData = append(BioData, human)
	err = json.NewEncoder(writer).Encode(&human)

	if err != nil {
		log.Fatalln("There was an error encoding the initialized struct")
	}
}

// Example GET request
func read(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	name := mux.Vars(request)["name"]
	for _, structs := range BioData {
		if structs.Name == name {
			err := json.NewEncoder(writer).Encode(&structs)

			if err != nil {
				log.Fatalln("There was an error encoding the initialized struct")
			}
		}
	}
}

// Assigned to PUT request
func update(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	var human Bio
	err := json.NewDecoder(request.Body).Decode(&human)
	if err != nil {
		log.Fatalln("There was an error decoding the request body into the struct")
	}

	for index, structs := range BioData {
		if structs.Name == human.Name {
			BioData = append(BioData[:index], BioData[index+1:]...)
		}
	}

	BioData = append(BioData, human)
	err = json.NewEncoder(writer).Encode(&human)
	if err != nil {
		log.Fatalln("There was an error encoding the initialized struct")
	}

}

// Take care of DELETE
func delete_(writer http.ResponseWriter, request *http.Request) {
	writer.Header().Set("Content-Type", "application/json")
	name := mux.Vars(request)["name"]
	indexChoice := 0
	for index, structs := range BioData {
		if structs.Name == name {
			indexChoice = index
		}
	}

	BioData = append(BioData[:indexChoice], BioData[indexChoice+1:]...)
}
