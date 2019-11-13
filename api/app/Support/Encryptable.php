<?php

namespace App\Support;
use Illuminate\Support\Facades\Crypt;

trait Encryptable
{
    /**
     * @param $role
     *
     * @return Role
     */
    public function getAttribute($key)
    {
        $value = parent::getAttribute($key);
        if (in_array($key, $this->encryptable) && !empty($value) ) {
            $value = Crypt::decrypt($value);
        }

        return $value;
    }

    public function setAttribute($key, $value)
    {
        if (in_array($key, $this->encryptable)) {
            $value = Crypt::encrypt($value);
        }

        return parent::setAttribute($key, $value);
    }
}
