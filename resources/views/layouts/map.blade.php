<!doctype html>
<html lang="fr">
    <head>
        @include('includes.head')
    </head>
    <body>
    <header>
        @include('includes.nav')
    </header>

    <main class="corps-de-page">
        @yield('content')
    </main>

    @include('includes.scripts')

    </body>
</html>