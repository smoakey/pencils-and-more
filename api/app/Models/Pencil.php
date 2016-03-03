<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Base Pencil Model
 */
class Pencil extends Model
{
	use SoftDeletes;

	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'pencils';

	/**
	 * Turn timestamps on for model
	 * 
	 * @var boolean
	 */
	public $timestamps = true;

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['deleted_at'];

	/**
	 * List of fillable vars via mass assignment
	 * 
	 * @var array
	 */
	protected $fillable = ['name', 'color', 'length'];
}