<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use Symfony\Component\HttpFoundation\Response;
use SammyK\LaravelFacebookSdk\LaravelFacebookSdk as FacebookSdk;

class FacebookController extends Controller    
{   

    public function login(FacebookSdk $fb) {
        // Send an array of permissions to request
        $login_url = $fb->getLoginUrl(['email']);

        // Obviously you'd do this in blade :)
        echo '<a href="' . $login_url . '">Login with Facebook</a>';
    }

    public function callback(FacebookSdk $fb) {
        // Obtain an access token.
        try {
            $token = $fb->getAccessTokenFromRedirect();
        } catch (Facebook\Exceptions\FacebookSDKException $e) {
            dd($e->getMessage());
        }
        // Access token will be null if the user denied the request
        // or if someone just hit this URL outside of the OAuth flow.
        if (! $token) {
            // Get the redirect helper
            $helper = $fb->getRedirectLoginHelper();

            if (! $helper->getError()) {
                abort(403, 'Unauthorized action.');
            }

            // User denied the request
            dd(
                $helper->getError(),
                $helper->getErrorCode(),
                $helper->getErrorReason(),
                $helper->getErrorDescription()
            );
        }
        
        if (! $token->isLongLived()) {
            // OAuth 2.0 client handler
            $oauth_client = $fb->getOAuth2Client();

            // Extend the access token.
            try {
                $token = $oauth_client->getLongLivedAccessToken($token);
            } catch (Facebook\Exceptions\FacebookSDKException $e) {
                dd($e->getMessage());
            }
        }

        $fb->setDefaultAccessToken($token);

        // Save for later
        Session::put('fb_user_access_token', (string) $token);

        // Get basic info on the user from Facebook.
        try {
            $response = $fb->get('/me?fields=id,name,email,first_name,last_name');
        } catch (Facebook\Exceptions\FacebookSDKException $e) {
            dd($e->getMessage());
        }

        // Convert the response to a `Facebook/GraphNodes/GraphUser` collection
        $facebook_user = $response->getGraphUser();
        //dd($facebook_user);
        // Create the user if it does not exist or update the existing entry.
        // This will only work if you've added the SyncableGraphNodeTrait to your User model.
         $user = User::createOrUpdateGraphNode($facebook_user);

        // Log the user into Laravel
        Auth::login($user);

        print_r($facebook_user);
        return redirect('/')->with('message', 'Successfully logged in with Facebook');

    }


}