<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use App\Support\UuidScopeTrait;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Spatie\Permission\Traits\HasRoles;
use Facebook\GraphNodes\GraphNode;
use SammyK\LaravelFacebookSdk\SyncableGraphNodeTrait;

class User extends Authenticatable
{
    use Notifiable, UuidScopeTrait, HasRoles, SyncableGraphNodeTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * This config is for SyncableGraphNode
     * @var array
     */
    protected static $graph_node_field_aliases = [
      //'id' => 'password',
        'name' => 'name',
        'email' => 'email',
        'first_name' => 'first_name',
        'last_name' => 'last_name'
    ];

    protected static $graph_node_fillable_fields = ['name', 'email','first_name','last_name'];
    
    /**
     * Find the user identified by the given $identifier.
     *
     * @param $identifier email|phone
     * @return mixed
     */
    public function findForPassport($identifier) {
        return User::orWhere('email', $identifier)->orWhere('name', $identifier)->first();
    }


    /**
     * Inserts or updates the Graph node to the local database
     *
     * @param array|GraphObject|GraphNode $data
     *
     * @return Model
     *
     * @throws \InvalidArgumentException
     */
    public static function createOrUpdateGraphNode($data)
    {
        // @todo this will be GraphNode soon
        if ($data instanceof GraphObject || $data instanceof GraphNode) {
            $data = array_dot($data->asArray());
        }

        $data = static::convertGraphNodeDateTimesToStrings($data);

        if (! isset($data['id'])) {
            throw new \InvalidArgumentException('Graph node id is missing');
        }

        $attributes = [static::getGraphNodeKeyName() => $data['email']];

        $graph_node = static::firstOrNewGraphNode($attributes);

        static::mapGraphNodeFieldNamesToDatabaseColumnNames($graph_node, $data);

        $graph_node->save();

        return $graph_node;
    }

    /**
     * Get db column name of primary Graph node key
     *
     * @return string
     */
    public static function getGraphNodeKeyName()
    {
        return static::fieldToColumnName('email');
    }
}
