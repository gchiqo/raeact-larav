<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Models\Film;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\File;
use Intervention\Image\Facades\Image;
use function MongoDB\BSON\toJSON;

class FilmController extends Controller
{
    public function index(Request $request)
    {
        if ($request->category != null)
            return JsonResource::collection(
                Film::query()->orderBy('id', 'desc')->where('category', $request->category)->paginate(10)
            );
        return JsonResource::collection(
            Film::query()->orderBy('id', 'desc')->paginate(10)
        );
    }

    public function indd(Request $request){
        if ($request->category != null)
            return JsonResource::collection(
                Film::query()->orderBy('id', 'desc')->where('liked', 1)->where('category', $request->category)->paginate(10)
            );
        return JsonResource::collection(
            Film::query()->orderBy('id', 'desc')->where('liked', 1)->paginate(10)
        );
    }
    public function store(Request $request)
    {
        $formFields = $request->validate([
            'name' => 'required',
            'category' => 'required',
            'rating' => 'required',
            'liked' => '',
        ]);
        if ($request->image != '') {
            $strpos = strpos($request->image, ';');
            $sub = substr($request->image, 0, $strpos);
            $ex = explode('/', $sub)[1];
            $name = time() . "." . $ex;
            $img = Image::make($request->image);
            $uplod_path = public_path() . "/upload/";
            $img->save($uplod_path . $name);
            $formFields['image'] = $name;
        } else $formFields['image'] = 'image.png';
        $film = Film::create($formFields);
        return response(new JsonResource($film), 201);
    }

    public function single(Film $film)
    {
            return new JsonResource($film);
    }

    public function like(Film $film)
    {
        $data['liked'] = $film->liked == 0 ? 1 : 0;
        $film->update($data);
        return new JsonResource($film);
    }

    public function destroy(Film $film)
    {
        $film->delete();
        return response("", 204);
    }
}
