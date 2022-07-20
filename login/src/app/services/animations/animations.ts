import {
    state,
    style,
    animate,
    transition,
    query,
    stagger,
    trigger,
    group
} from '@angular/animations';



export let fadeSlideInOut =
    trigger('fadeSlideInOut', [
        transition(':enter', [
            style({ opacity: 0, transform: 'translateY(10px)' }),
            animate('500ms', style({ opacity: 1, transform: 'translateY(0)' })),
        ]),
        transition(':leave', [
            animate('500ms', style({ opacity: 0, transform: 'translateY(10px)' })),
        ]),
    ])

export let listAnimation =
    trigger('listAnimation', [
        transition('* <=> *', [
            query(':enter',
                [style({ opacity: 0 }), stagger('60ms', animate('600ms ease-out', style({ opacity: 1 })))],
                { optional: true }
            ),
            query(':leave',
                animate('200ms', style({ opacity: 0 })),
                { optional: true }
            )
        ])
    ]);

export let sideContent = trigger('sideContentAnimation', [
    transition(':enter', [
        // we set the width of the outer container to 0, and hide the
        // overflow (so the inner container won't be visible)
        style({ width: '0px', overflow: 'hidden' }),
        group([
            // we animate the outer container width to it's original value
            animate('250ms ease-out', style({ width: '!' })),
            // in the same time we translate the inner element all the
            // way from left to right
            query('.side-list-content-data-inner', [
                style({ transform: 'translateX(-110%)' }),
                group([animate('250ms ease-out', style({ transform: 'translateX(-0%)' }))]),
            ]),
        ]),
    ]),
    transition(':leave', [
        style({ overflow: 'hidden' }),
        group([
            animate('250ms ease-out', style({ width: '0' })),
            query('.side-list-content-data-inner', [
                style({ transform: 'translateX(-0%)' }),
                group([animate('250ms ease-out', style({ transform: 'translateX(-110%)' }))]),
            ]),
        ]),
    ]),

])
export let slider =
    trigger('routeAnimations', [
        transition('* => isLeft', slideTo('left')),
        transition('* => isRight', slideTo('right')),
        transition('isRight => *', slideTo('left')),
        transition('isLeft => *', slideTo('right'))
    ]);

function slideTo(direction) {
    const optional = { optional: true };
    return [
        query(':enter, :leave', [
            style({
                position: 'absolute',
                top: 0,
                [direction]: 0,
                width: '100%'
            })
        ], optional),
        query(':enter', [
            style({ [direction]: '-100%' })
        ]),
        group([
            query(':leave', [
                animate('600ms ease', style({ [direction]: '100%' }))
            ], optional),
            query(':enter', [
                animate('600ms ease', style({ [direction]: '0%' }))
            ])
        ]),
    ];
}
export const fadeAnimation = trigger('fadeAnimation', [
    // The '* => *' will trigger the animation to change between any two states
    transition('* => *', [
      // The query function has three params.
      // First is the event, so this will apply on entering or when the element is added to the DOM.
      // Second is a list of styles or animations to apply.
      // Third we add a config object with optional set to true, this is to signal
      // angular that the animation may not apply as it may or may not be in the DOM.
      query(':enter', [style({ opacity: 0 })], { optional: true }),
      query(
        ':leave',
        // here we apply a style and use the animate function to apply the style over 0.3 seconds
        [style({ opacity: 1 }), animate('0.3s', style({ opacity: 0 }))],
        { optional: true }
      ),
      query(
        ':enter',
        [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
        { optional: true }
      )
    ])
  ]);
  export let fade = trigger('fade', [ 
    transition('void => *', [
      style({ opacity: 0 }), 
      animate(2000, style({opacity: 1}))
    ])
]) 