<?php
	// Переменная в PHP это $имя_переменной
	// filter_var($_POST["атрибут name тэга input"], FILTER_SANITIZE_STRING)
	$name      = filter_var($_POST["user-name"], FILTER_SANITIZE_STRING);
	$phone     = filter_var($_POST["user-phone"], FILTER_SANITIZE_STRING);
	$email     = filter_var($_POST["user-email"], FILTER_SANITIZE_STRING);
	$product   = filter_var($_POST["user-product"], FILTER_SANITIZE_STRING);
	$message   = filter_var($_POST["user-message"], FILTER_SANITIZE_STRING);
	$accept   = filter_var($_POST["user-accept"], FILTER_SANITIZE_STRING);
	$errors;

	// В PHP добавить лишь проверку на пустоту
	// if (empty(переменная)) {
	// 		$errors = "Ошибка";
	// }
	if (empty($name)) {
		$errors = "Ошибка";
	};
	if (empty($email)) {
		$errors = "Ошибка";
	};
	if (empty($phone)) {
		$errors = "Ошибка";
	};
	if (empty($product)) {
		$errors = "Ошибка";
	};
	if (empty($message)) {
		$errors = "Ошибка";
	};
	if (empty($accept)) {
		$errors = "Ошибка";
	};
	// Чтобы добавить несколько полей в PHP нужно использовать .=
	// Пример ниже

	$to = "ввести почту, на которую надо отправить письмо";
	$mailBody = "Новый запрос\n";
	$mailBody .= "Поле имя: " . $name . "\n";
	$mailBody .= "Поле почта: " . $email . "\n";
	$mailBody .= "Телефон: " . $phone . "\n";
	$mailBody .= "Товар или услуга " . $product . "\n";
	$mailBody .= "Сообщение " . $message . "\n";
	$mailBody .= "Согласие " . $accept . "\n";
	// и так столько, сколько нужно

	// Это отправка. Это не трогаем
	if (mail($to, 'JS. ДЗ номер 4', $mailBody)) {
			$output = "ok";
			die($output);
	} else {
			$output = $errors;
			die($output);
	}
?>