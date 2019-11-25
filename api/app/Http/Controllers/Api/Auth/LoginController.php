<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Api\DingoController;
use App\Transformers\NullObjectTransformer;
use App\Transformers\Users\UserTransformer;
use App\Transformers\CredentialTransformer;
use App\Models\NullObject;
use App\Entities\User;
use Dingo\Api\Http\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;
class LoginController extends DingoController
{
    /**
     * Handle a login request to the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse|\Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $this->validateLogin($request);
        $this->attemptLogin($request);
    }
    /**
     * Validate the user login request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return void
     */
    protected function validateLogin(Request $request)
    {
        $this->validate($request, [
            $this->username() => 'required|string',
            'password' => 'required|string',
        ]);
    }
    /**
     * Attempt to log the user into the application.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return bool
     */
    protected function attemptLogin(Request $request)
    {
        if (Auth::guard("web")->once($this->credentials($request)) ){
            $this->sendLoginResponse($request);
        } else {
            $this->sendFailedLoginResponse($request);
        }
    }
    /**
     * Get the needed authorization credentials from the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    protected function credentials(Request $request)
    {
        return $request->only($this->username(), 'password');
    }
    /**
     * Send the response after the user was authenticated.
     * The logic uses personal access token created by Passport
     * in the background. Feel free to change it to your needs.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    protected function sendLoginResponse(Request $request)
    {
        $inputs = $request->all();
        $user = User::select('uuid','username','name','email')->where($this->username(), $inputs[$this->username()])->firstOrFail();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me == false)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();
        $meta = array(
            'token_type' => 'Bearer',
            'access_token' => $tokenResult->accessToken,
            'expires_in' => Carbon::parse(
                $tokenResult->token->expires_at
            )->diffInSeconds(),
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString(),
            'status_code' => 200,
            'status_text' => "OK",
            'message' => trans("auth.login.success"),
        );
        $response = $this->response->item($user, new CredentialTransformer())
            ->setStatusCode(200)
            ->setMeta($meta);
        
        $response->throwResponse();
    }
     protected function sendLoginResponse2(Request $request)
    {
        $inputs = $request->all();
        $user = User::where($this->username(), $inputs[$this->username()])->firstOrFail();
        $meta = array(
            'status_code' => 200,
            'status_text' => "OK",
            'message' => trans("auth.login.success"),
        );
        $response = $this->response->item($user, new UserTransformer())
            ->setStatusCode(200)
            ->setMeta($meta);
        
        $response->throwResponse();
    }
    protected function sendLoginResponse3(Request $request)
    {
        $inputs = $request->all();
        $user = User::select('id','username','name')
            ->where($this->username(), $inputs[$this->username()])
            ->firstOrFail();

        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();            

        $response = $this->response
        ->json([
            'status' => 'ok',
            'token' => $token,
            'expires_in' => $token->expires_at
        ]);
        //$response->throwResponse();
    }    
    /**
     * The user has been authenticated.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  mixed  $user
     * @return mixed
     */
    protected function authenticated(Request $request, $user)
    {
       
    }
    /**
     * Get the failed login response instance.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\RedirectResponse
     */
    protected function sendFailedLoginResponse(Request $request)
    {
        $this->response()->errorUnauthorized(trans('auth.login.failed'));
    }
    /**
     * Get the login username to be used by the controller.
     *
     * @return string
     */
    public function username()
    {
        return 'username';
    }
    /**
     * Log the user out of the application.
     *
     * The logout procedure just deletes the personal access token
     * which was created by Passport. You can also just revoke them
     * or incorporate refresh tokens. Do as you like.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $request->user()->token()->revoke();
        $request->user()->token()->delete();
        $meta = array(
            'status_code' => 200,
            'status_text' => "OK",
            'message' => trans("auth.logout.success"),
        );
        $response = $this->response->item(new NullObject(), new NullObjectTransformer())
            ->setStatusCode(200)
            ->setMeta($meta);
        // Use this method instead of send(). It also saves you from weird
        // assertJsonStructure errors
        $response->throwResponse();
    }

}