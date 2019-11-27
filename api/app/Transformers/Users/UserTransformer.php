<?php

namespace App\Transformers\Users;

use App\Entities\User;
use League\Fractal\TransformerAbstract;
use Illuminate\Support\Facades\Crypt;
/**
 * Class UserTransformer.
 */
class UserTransformer extends TransformerAbstract
{
    /**
     * @var array
     */
    protected $availableIncludes = ['roles'];
    /**
     * @param User $model
     * @return array
     */
    public function transform(User $model)
    {
        return [
            'id' => $model->uuid,
            'username' => !empty($model->username) ? Crypt::encryptString($model->username) : null,
            'name' => !empty($model->name) ? Crypt::encryptString($model->name) : null,
            'email' => !empty($model->email) ? Crypt::encryptString($model->email) : null,
            'first_name' => !empty($model->first_name) ? Crypt::encryptString($model->first_name) : null,
            'last_name' => !empty($model->last_name) ? Crypt::encryptString($model->last_name):null,
            'created_at' => !empty($model->created_at) ? $model->created_at->toIso8601String() : null,
            'updated_at' => !empty($model->updated_at) ? $model->updated_at->toIso8601String() : null,
        ];
    }

    /**
     * @param User $model
     * @return \League\Fractal\Resource\Collection
     */
    public function includeRoles(User $model)
    {
        return $this->collection($model->roles, new RoleTransformer());
    }
}
