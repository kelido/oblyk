@inject('Helpers','App\Lib\HelpersTemplates')

<input type="hidden" value="{{$crag->id}}" id="id-crag-actualite">

<div class="row">
    <div class="col s12">
        <div class="card-panel" id="insert-posts-zone">

        </div>
    </div>
</div>

{{--BOUTON POUR AJOUTER UN POST AU FIL D'ACTUALITÉ--}}
@if(Auth::check())
    <div class="fixed-action-btn horizontal">
        <a {!! $Helpers::tooltip('Poster dans le fil d\'actualité') !!} {!! $Helpers::modal(route('postModal'), ["postable_id"=>$crag->id, "postable_type"=>"Crag", "post_id"=>"", "title"=>"Poster une actualité", "method"=>"POST" ]) !!} class="btn-floating btn-large red waves-effect waves-light tooltipped btnModal">
            <i class="large material-icons">add</i>
        </a>
    </div>
@endif