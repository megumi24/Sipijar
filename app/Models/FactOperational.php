<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class FactOperational extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'pijar_fact_operational';

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
        return [
            'event_date' => 'datetime:Y-m-d',
            'created_at' => 'datetime',
            'verified' => 'boolean',
        ];
    }

    protected function actorsInvolved(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $this->pgArrayToPhpArray($value),
            set: fn($value) => $this->phpArrayToPgArray($value),
        );
    }

    protected function companiesInvolved(): Attribute
    {
        return Attribute::make(
            get: fn($value) => $this->pgArrayToPhpArray($value),
            set: fn($value) => $this->phpArrayToPgArray($value),
        );
    }

    private function pgArrayToPhpArray(?string $value): array
    {
        if (empty($value)) return [];
        // Remove curly braces and split by comma, respecting quotes
        $value = trim($value, '{}');
        preg_match_all('/"([^"]+)"|([^,]+)/', $value, $matches);
        return array_map('trim', array_filter($matches[1] + $matches[2]));
    }

    private function phpArrayToPgArray(array $value): string
    {
        $escaped = array_map(fn($v) => '"' . str_replace('"', '\"', $v) . '"', $value);
        return '{' . implode(',', $escaped) . '}';
    }
}
