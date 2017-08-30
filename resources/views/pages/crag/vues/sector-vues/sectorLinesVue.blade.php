@inject('Helpers','App\Lib\HelpersTemplates')

@if(count($routes) > 0)

    <table class="striped responsive-table">
        <tr>
            <th></th>
            <th>Note</th>
            <th>Cote</th>
            <th>Nom</th>
            <th>Type</th>
            <th>Hauteur</th>
            <th>Année</th>
            <th>Ouvreur</th>
            <th></th>
        </tr>
    @foreach($routes as $route)

        <tr class="button-open-route" onclick="loadRoute({{$route->id}})">
            <td class="button-open-route" onclick="loadRoute({{$route->id}},'carnet');event.stopPropagation();">
                @if(isset($route->tickLists[0]->id))
                    <i {!! $Helpers::tooltip('Fait partie de ma tick-list') !!} class="material-icons tooltipped">crop_free</i>
                @endif
                @if(isset($route->crosses[0]->id))
                    @if($route->crosses[count($route->crosses) - 1]->status_id == 1)
                        <i {!! $Helpers::tooltip(trans('elements/statuses.status_1')) !!} class="material-icons tooltipped">crop_square</i>
                    @endif
                    @if($route->crosses[count($route->crosses) - 1]->status_id == 2)
                        <i {!! $Helpers::tooltip(trans('elements/statuses.status_2')) !!} class="material-icons tooltipped">done</i>
                    @endif
                    @if($route->crosses[count($route->crosses) - 1]->status_id == 3)
                        <i {!! $Helpers::tooltip(trans('elements/statuses.status_3')) !!} class="material-icons tooltipped">check_box</i>
                    @endif
                    @if($route->crosses[count($route->crosses) - 1]->status_id == 4)
                        <i {!! $Helpers::tooltip(trans('elements/statuses.status_4')) !!} class="material-icons tooltipped">flash_on</i>
                    @endif
                    @if($route->crosses[count($route->crosses) - 1]->status_id == 5)
                        <i {!! $Helpers::tooltip(trans('elements/statuses.status_5')) !!} class="material-icons tooltipped">visibility</i>
                    @endif
                    @if($route->crosses[count($route->crosses) - 1]->status_id == 6)
                        <i {!! $Helpers::tooltip(trans('elements/statuses.status_6')) !!} class="material-icons tooltipped">repeat</i>
                    @endif
                @endif
            </td>
            <td><img {!! $Helpers::tooltip('Évaluation sur ' . $route->nb_note . ' note(s)') !!} src="/img/note_{{$route->note}}.png" alt="" class="tooltipped img-note-route-sector"></td>
            <td>
                @if(count($route->routeSections) > 1)
                    {!! count($route->routeSections) !!} L.
                @else
                    <span class="color-grade-{{$route->routeSections[0]->grade_val}}">{{$route->routeSections[0]->grade}}{{$route->routeSections[0]->sub_grade}}</span>
                @endif
            </td>
            <td>{{$route->label}}</td>
            <td><img src="/img/climb-{{$route->climb_id}}.png" alt="" class="type-ligne"> {{$route->climb->label}}</td>
            <td>
                @if(count($route->routeSections) == 1 && $route->height >= 35)
                    <i {!! $Helpers::tooltip('Attention voie de plus de 35 mètres') !!} class="tooltipped material-icons red-text left">report_problem</i>
                @endif
                {{$route->height}} mètres
            </td>
            <td>{{$route->open_year}}</td>
            <td>{{$route->opener}}</td>
            <td>
                @if($route->descriptions_count > 0)
                    <i {!! $Helpers::tooltip('il y a ' . $route->descriptions_count . ' descriptions sur cette ligne') !!} class="tooltipped material-icons tiny">comment</i>
                @endif
                @if($route->photos_count > 0)
                    <i {!! $Helpers::tooltip('il y a ' . $route->photos_count . ' photos sur cette ligne') !!} class="tooltipped material-icons tiny">photo_camera</i>
                @endif
                @if($route->videos_count > 0)
                    <i {!! $Helpers::tooltip('il y a ' . $route->videos_count . ' vidéos sur cette ligne') !!} class="tooltipped material-icons tiny">videocam</i>
                @endif
            </td>
        </tr>

    @endforeach
    </table>

@else

    <p class="grey-text text-center">Il n'y a pas de ligne référencée sur ce secteur,<br> vous pouvez en ajouter en cliquant sur le bouton +</p>

@endif


{{--BOUTON POUR AJOUTER UN LIGNE--}}
@if(Auth::check())
    <div class="row">
        <div class="text-right col s12">
            <a {!! $Helpers::tooltip('Ajouter une voie') !!} {!! $Helpers::modal(route('routeModal'),['sector_id' => $sector->id, 'crag_id' => $sector->crag_id ,'title'=>'Ajouter une ligne','method'=>'POST']) !!} class="btn-floating btn waves-effect waves-light tooltipped btnModal"><i class="material-icons">add</i></a>
        </div>
    </div>
@endif