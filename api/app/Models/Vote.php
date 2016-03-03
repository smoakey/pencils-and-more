<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

/**
 * Reusable Vote Model
 */
class Vote extends Model
{
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'votes';

	/**
	 * Turn timestamps on for model
	 * 
	 * @var boolean
	 */
	public $timestamps = false;

	/**
	 * List of fillable vars via mass assignment
	 * 
	 * @var array
	 */
	protected $fillable = ['positive'];

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['id', 'voteable_id', 'voteable_type'];

	/**
     * Get all of the owning likeable models.
     */
    public function likeable()
    {
        return $this->morphTo();
    }
}