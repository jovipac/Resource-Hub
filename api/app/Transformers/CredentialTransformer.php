<?php
namespace App\Transformers;
use App\Entities\User;
use League\Fractal\TransformerAbstract;
use Illuminate\Support\Facades\Crypt;

class CredentialTransformer extends TransformerAbstract
{
    /**
     * @param User $model
     * @return array
     */
    public function transform(User $model)
    {
        return [
            'userId' => $model->uuid,
            'username' => $model->username,
            'name' => !empty($model->name) ? Crypt::encryptString($model->name) : null,
            'email' => !empty($model->email) ? Crypt::encryptString($model->email) : null,
        ];
    }
}