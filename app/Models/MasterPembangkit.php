<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class MasterPembangkit extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'pijar_master_pembangkit';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array<string>|bool
     */
    protected $guarded = [];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [];
    }

    protected function optionLabel(): Attribute
    {
        return Attribute::make(
            get: fn($value, $attributes) => "[{$attributes['kode']}] {$attributes['nama']}",
        );
    }
}
