<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Add new columns
            $table->string('telegram_id')->nullable();
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('photo_url')->nullable();
            $table->string('password')->nullable()->change();

            // Rename 'email' to 'username'
            $table->renameColumn('email', 'username');
        });

        // Optional: If you want to split existing 'name' data, you need to write a DB update here.
        // Example (simple split by first space):
        DB::table('users')->get()->each(function ($user) {
            if ($user->name) {
                $parts = explode(' ', $user->name, 2);
                DB::table('users')->where('id', $user->id)->update([
                    'first_name' => $parts[0],
                    'last_name' => $parts[1] ?? null,
                ]);
            }
        });

        // Remove the old 'name' column
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            // Rename 'username' back to 'email'
            $table->renameColumn('username', 'email');

            // Add back the 'name' column
            $table->string('name')->nullable();

            // Remove the new columns
            $table->dropColumn(['telegram_id', 'first_name', 'last_name', 'photo_url']);
            $table->string('password')->nullable(false)->change();
        });
    }
};
