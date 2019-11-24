<?php

namespace App\Transformers\Users;

use App\Entities\Role;
use League\Fractal\TransformerAbstract;
use Illuminate\Support\Facades\Crypt;
/**
 * Class RolTransformer.
 */
class RoleTransformer extends TransformerAbstract
{
    /**
     * @var array
     */
    protected $availableIncludes = ['permissions'];

    /**
     * @param Role $model
     * @return array
     */
    public function transform(Role $model)
    {
        return [
            'id' => $model->uuid,
            'name' => !empty($model->name) ? Crypt::encryptString($model->name) : null,
            'created_at' => $model->created_at->toIso8601String(),
            'updated_at' => $model->updated_at->toIso8601String(),
        ];
    }

    /**
     * @param Role $model
     * @return \League\Fractal\Resource\Collection
     */
    public function includePermissions(Role $model)
    {
        return $this->collection($model->permissions, new PermissionTransformer());
    }
}
