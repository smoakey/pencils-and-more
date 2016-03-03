<?php
namespace App\Http\Controllers;

use Laravel\Lumen\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use App\Repositories\PencilRepository;

/**
 * Pencil REST API Controller
 */
class PencilController extends BaseController
{
    /**
     * Create instance of controller typehinting depencencies which
     * will get automatically injected via Lumen Container
     * 
     * @param PencilRepository $pencilRepository 
     */
    public function __construct(PencilRepository $pencilRepository)
    {
        $this->pencilRepository = $pencilRepository;
    }

    /**
     * List pencils
     * 
     * @return string
     */
    public function index()
    {
        $pencils = $this->pencilRepository->getAll();

        return response()->json($pencils);
    }

    /**
     * Get single pencil
     *
     * @param  int $id Pencil id
     * @return string
     */
    public function show($id)
    {
        $pencil = $this->pencilRepository->getById($id);

        return response()->json($pencil);
    }

    /**
     * Create a new Pencil 
     * 
     * @return string
     */
    public function store(Request $request)
    {
        $pencil = $this->pencilRepository->create([
            'name'   => $request->input('name'),
            'color'  => $request->input('color'),
            'length' => $request->input('length')
        ]);

        return response()->json($pencil);
    }

    /**
     * Update an Existing Pencil
     *
     * @param  int $id Pencil id
     * @return string
     */
    public function update(Request $request, $id)
    {
        $status = $this->pencilRepository->update($id, $request->all('length'));
        
        if ($status == 1) {
            return $this->show($id);
        }
        
        return response()->json($pencil);
    }

    /**
     * Delete an Existing Pencil
     * 
     * @param  int $id Pencil id
     * @return string
     */
    public function destroy($id)
    {
        $status = $this->pencilRepository->delete($id);

        return response()->json(['success' => true, 'status' => $status]);
    }
}