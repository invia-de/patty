If you click on the trigger below, an item will be added/removed from the wishlist above.

You can specify, which event namespace and storage are used with `eventNamespace` and
`storageName`

```jsx
<div>
    SampleHotel 1:
    <WishlistTrigger itemKey="s1" itemValue={{
        image: 'https://pictures.ultranet.hotelreservation.com/images/cache/2b/68/2b683f64b8a4d56b124ddbfbc6572fd0.jpg?../../imagedata/UCHIds/90/6783090/result/3258045_8_243384_800_530_140347_VAId983Seq1IMG9d1e2c0381071e05ffba05fa43b46fa0.jpg,,180,180,,,1,,,,,,,RW,0,0',
        link: '#',
        name: 'SampleHotel #1',
        location: "Leipzig, Germany",
        stars: 4.5,
        price: "€ 512",
        details: "7 Tage | 2 Personen | inkl. Flug | Übernachtung mit Frühstück | Doppelzimmer",
        rating: {
            rating: 3.3,
            count: 175,
            link: 'https://aidu.de.uhib.test.pausch.euc1.lan/?KID=625612&IFF=51755&RequestArt=hotel&engine=pauschal&START=5'
        }
    }} />
</div>
<div>
    SampleHotel 2:
    <WishlistTrigger itemKey="s2" itemValue={{
        image: 'https://imgplaceholder.com/285x230',
        link: '#',
        name: 'SampleHotel #2 with a very very long name',
        location: "Leipzig, Germany",
        stars: 3,
        price: "€ 450",
        details: "7 Tage | 2 Personen | inkl. Flug | Übernachtung mit Frühstück | Doppelzimmer",
        rating: {
            rating: 4.1,
            count: 86,
            link: 'https://aidu.de.uhib.test.pausch.euc1.lan/?KID=625612&IFF=51755&RequestArt=hotel&engine=pauschal&START=5'
        }
    }} />
</div>
<div>
    SampleHotel 3:
    <WishlistTrigger itemKey="s3" itemValue={{
        image: 'https://imgplaceholder.com/285x230',
        link: '#',
        name: 'SampleHotel #3',
        location: "Some very, very long location, somewhere on earth",
        stars: 4.5,
        price: "€ 128",
        details: "7 Tage | 2 Personen | inkl. Flug | Übernachtung mit Frühstück | Doppelzimmer",
        rating: {
            rating: 5,
            count: 17,
            link: 'https://aidu.de.uhib.test.pausch.euc1.lan/?KID=625612&IFF=51755&RequestArt=hotel&engine=pauschal&START=5'
        }
    }} />
</div>
<div>
    SampleHotel 4:
    <WishlistTrigger itemKey="s4" itemValue={{
        image: 'https://imgplaceholder.com/285x230',
        link: '#',
        name: 'SampleHotel #4',
        location: "Leipzig, Germany",
        stars: 1,
        price: "€ 256",
        details: "7 Tage | 2 Personen | inkl. Flug | Übernachtung mit Frühstück | Doppelzimmer",
        rating: {
            rating: 2,
            count: 223,
            link: 'https://aidu.de.uhib.test.pausch.euc1.lan/?KID=625612&IFF=51755&RequestArt=hotel&engine=pauschal&START=5'
        }
    }} />
</div><div>
    SampleHotel 5:
    <WishlistTrigger itemKey="s5" itemValue={{
        image: 'https://imgplaceholder.com/285x230',
        link: '#',
        name: 'SampleHotel #5',
        location: "Leipzig, Germany",
        stars: 2,
        price: "€ 700",
        details: "7 Tage | 2 Personen | inkl. Flug | Übernachtung mit Frühstück | Doppelzimmer",
        rating: {
            rating: 4,
            count: 154,
            link: 'https://aidu.de.uhib.test.pausch.euc1.lan/?KID=625612&IFF=51755&RequestArt=hotel&engine=pauschal&START=5'
        }
    }} />
</div>
<div>
    SampleHotel 6:
    <WishlistTrigger itemKey="s6" itemValue={{
        image: 'https://imgplaceholder.com/285x230',
        link: '#',
        name: 'SampleHotel #6',
        location: "Leipzig, Germany",
        stars: 5,
        price: "€ 202",
        details: "7 Tage | 2 Personen | inkl. Flug | Übernachtung mit Frühstück | Doppelzimmer",
        rating: {
            rating: 3,
            count: 663,
            link: 'https://aidu.de.uhib.test.pausch.euc1.lan/?KID=625612&IFF=51755&RequestArt=hotel&engine=pauschal&START=5'
        }
    }} />
</div><div>
    SampleHotel 7:
    <WishlistTrigger itemKey="s7" itemValue={{
        image: 'https://imgplaceholder.com/285x230',
        link: '#',
        name: 'SampleHotel #7',
        location: "Leipzig, Germany",
        stars: 4,
        price: "€ 712",
        details: "7 Tage | 2 Personen | inkl. Flug | Übernachtung mit Frühstück | Doppelzimmer",
        rating: {
            rating: 5,
            count: 1222,
            link: 'https://aidu.de.uhib.test.pausch.euc1.lan/?KID=625612&IFF=51755&RequestArt=hotel&engine=pauschal&START=5'
        }
    }} />
</div>
<div>
    SampleHotel 8:
    <WishlistTrigger itemKey="s8" itemValue={{
        image: 'https://imgplaceholder.com/285x230',
        link: '#',
        name: 'SampleHotel #8',
        location: "Leipzig, Germany",
        stars: 3.5,
        price: "€ 155",
        details: "7 Tage | 2 Personen | inkl. Flug | Übernachtung mit Frühstück | Doppelzimmer",
        rating: {
            rating: 4.3,
            count: 17,
            link: 'https://aidu.de.uhib.test.pausch.euc1.lan/?KID=625612&IFF=51755&RequestArt=hotel&engine=pauschal&START=5'
        }
    }} />
</div>
<div>
    LegacyHotel 9:
    <WishlistTrigger itemKey="999_iff" itemValue={{
        image: 'https://imgplaceholder.com/285x230',
        link: '#',
        name: 'LegacyHotel #9',
        location: "Leipzig, Germany",
        stars: 3.5
    }} />
</div>
```
