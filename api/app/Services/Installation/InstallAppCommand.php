<?php

namespace App\Services\Installation;

/**
 * Class InstallAppCommand.
 */
class InstallAppCommand
{
    /**
     * @var
     */
    public $username;
    /**
     * @var
     */
    public $name;

    /**
     * @var
     */
    public $email;

    /**
     * @var
     */
    public $password;

    /**
     * @var
     */
    public $password_confirmation;

    /**
     * InstallAppCommand constructor.
     *
     * @param $username
     * @param $email
     * @param $password
     * @param $password_confirmation
     */
    public function __construct(
        $username = 'root',
        $name = 'Administrator',
        $email = 'admin@admin.com',
        $password = 'secret1234',
        $password_confirmation = 'secret1234'
    ) {
        $this->username = $username;
        $this->name = $name;
        $this->email = $email;
        $this->password = $password;
        $this->password_confirmation = $password_confirmation;
    }
}
