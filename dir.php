<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname ="db";
$tablename ="comment";

$conn = mysqli_connect($servername, $username, $password);
$conn->query("set names 'utf8'"); 
$sql = "CREATE DATABASE IF NOT EXISTS $dbname";

if (!mysqli_query($conn, $sql)) {
  echo ("<script>alert( 'Ошибка создания базы данных:  ". mysqli_error($conn)."')</script>");
}

$conn = mysqli_connect($servername, $username, $password, $dbname);
$conn->query("set names 'utf8'"); 
$sqltable = "CREATE TABLE IF NOT EXISTS $tablename (id INTEGER AUTO_INCREMENT PRIMARY KEY, name TEXT(255), email TEXT(255), comment TEXT(255)) CHARACTER SET utf8 COLLATE utf8_general_ci;";

if($conn->query($sqltable)===false){
  echo ("<script>alert('Ошибка создания таблицы: " . $conn->error."')</script>");
}

//добавление в бд
if(isset($_POST['name'])){
  if (!$conn) {
    echo ('Ошибка подключения');
    exit();
  }
  $name = $_POST['name'];
  $email = $_POST['email'];
  $comment = $_POST['comment'];
  $qweri = "INSERT INTO $tablename (name, email, comment) VALUES ('$name','$email','$comment');";
  $result = mysqli_query($conn,$qweri);
  $qweri = "SELECT name, email, comment FROM $tablename WHERE name = '$name' AND email = '$email' AND comment = '$comment'";
  $value = mysqli_query($conn, $qweri);
  $com_pol = $value ->fetch_assoc();
  $value ->close();
  echo $com_pol["name"].'`'.$com_pol["email"].'`'.$com_pol["comment"];
};

//для уточнения кол-ва эл в бд
if(isset($_POST['go'])){
  $a = mysqli_query($conn,"SELECT COUNT(1) FROM $tablename");
  $b = mysqli_fetch_array( $a );
  echo $b[0];
}

// для формирования уже существующих карточек из бд
if(isset($_POST['tu'])){
  $i = $_POST['tu'];
  $qweri = "SELECT name, email, comment FROM $tablename WHERE id = '$i'";
  $value = mysqli_query($conn, $qweri);
  $com_pol = $value ->fetch_assoc();
  $value ->close();
  echo $com_pol["name"].'`'.$com_pol["email"].'`'.$com_pol["comment"];
}
?>