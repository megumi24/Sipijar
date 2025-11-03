<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
        return [
            'latitude' => 'float',
            'longitude' => 'float',
        ];
    }

    protected function optionLabel(): Attribute
    {
        return Attribute::make(
            get: fn($value, $attributes) => "[{$attributes['kode']}] {$attributes['nama']}",
        );
    }

    public function facts(): HasMany
    {
        return $this->hasMany(FactOperational::class, 'infrastructure_code', 'kode');
    }

    public static function getSituationData()
    {
        $pembangkits = MasterPembangkit::withCount([
            'facts as jumlah' => function (Builder $query) {
                $query->where('verified', true);
            }
        ])->with('facts')->get();

        $pembangkits->map(function ($pembangkit) {
            $pembangkit->cases = $pembangkit->facts
                ->where('verified', true)
                ->groupBy('ahtg_code')
                ->map(fn($group, $code) => [
                    'code' => $code,
                    'label' => $group->first()->athg_type,
                    'jumlah' => $group->count(),
                ])
                ->values();
            unset($pembangkit->facts);
            return $pembangkit;
        });
        return $pembangkits;
    }
}
