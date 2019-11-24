<?php

namespace App\Transformers\Users;

use App\Entities\Permission;
use League\Fractal\TransformerAbstract;
use Illuminate\Support\Facades\Crypt;
/**
 * Class PermissionTransformer.
 */
class PermissionTransformer extends TransformerAbstract
{
    /**
     * @param Permission $model
     * @return array
     */
    public function transform(Permission $model)
    {
        return [
            'id' => $model->uuid,
            'name' => !empty($model->name) ? Crypt::encryptString($model->name) : null,
            'created_at' => $model->created_at->toIso8601String(),
            'updated_at' => $model->updated_at->toIso8601String(),
        ];
    }
}
