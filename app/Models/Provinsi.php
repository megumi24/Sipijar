<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Gate;

class Provinsi extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'm_provinsi';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'kd_prov';

    /**
     * Indicates if the model's ID is auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;

    /**
     * The data type of the primary key ID.
     *
     * @var string
     */
    protected $keyType = 'string';

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that aren't mass assignable.
     *
     * @var array
     */
    protected $guarded = [];

    protected function namaDati(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => in_array($attributes['kd_prov'], ['11', '31', '34'])
                ? ''
                : 'PROVINSI'
        )->shouldCache();
    }

    protected function namaLengkap(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => "{$this->namaDati} {$attributes['nama_prov']}"
        )->shouldCache();
    }

    protected function namaWithCode(): Attribute
    {
        return Attribute::make(
            get: fn(mixed $value, array $attributes) => "[{$attributes['kd_prov']}] {$attributes['nama_prov']}"
        )->shouldCache();
    }

    public static function getProvinsiOptions(): array
    {
        $provinsiOptions = [];
        $provinsis = [];
        $queryBuilder = Provinsi::query();
        $provinsiOptions[] = ['value' => '', 'label' => '---PILIH PROVINSI---'];
        $provinsis = $queryBuilder->orderBy('kd_prov')->get();

        foreach ($provinsis as $provinsi) {
            $provinsiOptions[] = ['value' => $provinsi->nama_prov, 'label' => $provinsi->nama_prov];
        }

        return $provinsiOptions;
    }

    public static function getNamaWithCodeFromCode(string $kd_prov = ''): string
    {
        if (empty($kd_prov)) return '';
        if ($kd_prov === '00') return 'SEMUA PROVINSI';
        return Provinsi::where('kd_prov', $kd_prov)->first()->namaWithCode;
    }
}
