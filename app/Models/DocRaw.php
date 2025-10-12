<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DocRaw extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'pijar_doc_raw';

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
        return [
            'created_date' => 'datetime:Y-m-d',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'verified' => 'boolean',
        ];
    }
}
