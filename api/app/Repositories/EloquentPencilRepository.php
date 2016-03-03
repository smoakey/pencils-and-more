<?php
namespace App\Repositories;
use App\Models\Pencil;
use App\Repositories\PencilRepository;

/**
 * Eloquent Implementation of Pencil Repository
 */
class EloquentPencilRepository implements PencilRepository
{
	/**
	 * Get all pencils
	 * 
	 * @return array List of all pencils
	 */
	public function getAll()
	{
		return Pencil::all()->toArray();
	}

	/**
	 * Get Single Pencil
	 * 
	 * @param  int $id    Pencil id
	 * @return object     Pencil model
	 */
	public function getById($id)
	{
		return Pencil::findOrFail($id);
	}

	/**
	 * Create new pencil
	 * 
	 * @param  object $data Pencil data
	 * @return object       Pencil model
	 */
	public function create($data)
	{
		return Pencil::create($data);
	}

	/**
	 * Update Pencil object
	 * 
	 * @param  int    $id   Pencil id
	 * @param  object $data Pencil data
	 * @return object       Pencil model
	 */
	public function update($id, $data)
	{
		$pencil = $this->getById($id);
		$pencil->fill($data);
		return $pencil->save();
	}

	/**
	 * Delete Pencil by Id
	 * 
	 * @param  Int $id Pencil id
	 * @return Object  Pencil model
	 */
	public function delete($id)
	{
		return Pencil::destroy($id);
	}
}