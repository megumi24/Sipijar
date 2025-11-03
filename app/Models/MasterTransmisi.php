<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class MasterTransmisi extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'pijar_master_transmisi';

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
            'koordinat' => 'array',
        ];
    }

    public function facts(): HasMany
    {
        return $this->hasMany(FactOperational::class, 'infrastructure_code', 'kode');
    }

    public static function getSituationData()
    {
        $transmisis = MasterTransmisi::whereNotNull('koordinat')->withCount([
            'facts as jumlah' => function (Builder $query) {
                $query->where('verified', true);
            },
        ])->with('facts')->get();

        $transmisis->map(function ($transmisi) {
            $transmisi->cases = $transmisi->facts
                ->where('verified', true)
                ->groupBy('ahtg_code')
                ->map(fn($group, $code) => [
                    'code' => $code,
                    'label' => $group->first()->athg_type,
                    'jumlah' => $group->count(),
                ])
                ->values();
            unset($transmisi->facts);
            return $transmisi;
        });

        return $transmisis;
    }
}
