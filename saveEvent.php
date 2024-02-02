<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "boumevent";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("La connexion à la base de données a échoué : " . $conn->connect_error);
}

$date = $_POST['eventDate'];
$eventName = $_POST['eventName'];
$eventDescription = $_POST['eventDescription'];
$clientName = $_POST['clientName'];
$email = $_POST['email'];
$phoneNumber = $_POST['phoneNumber'];
$region = $_POST['region'];

if (empty($date) || empty($eventName)|| empty($eventDescription) || empty($clientName) || empty($email) || empty($phoneNumber) || empty($region)) {
    echo "Veuillez remplir tous les champs obligatoires.";
} else {
    $sql = "INSERT INTO events (date, eventName, eventDescription, clientName, email, phoneNumber, region) VALUES ('$date', '$eventName','$eventDescription', '$clientName', '$email', '$phoneNumber', '$region')";

    if ($conn->query($sql) === TRUE) {
        echo "L'événement a été enregistré avec succès.";
    } else {
        echo "Erreur lors de l'enregistrement de l'événement : " . $conn->error;
    }
}

$conn->close();
?>
