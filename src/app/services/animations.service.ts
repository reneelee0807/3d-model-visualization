import {
    trigger,
    transition,
    style,
    query,
    group,
    animateChild,
    animate,
    keyframes,
    stagger
  } from '@angular/animations'
  
  class AnimationService {
  
    public readonly listAnimation = trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(-50%)' }),
          stagger(80, [
            animate(500, style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ])
  
  
    public readonly sideMenuSlide = trigger('slideInOut', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('300ms ease-in-out', style({transform: 'translateX(0%)'}))
      ]),
      transition(':leave', [
        animate('300ms ease-in-out', style({transform: 'translateX(-100%)'}))
      ])
    ])
  
    public readonly stepper =
      trigger('routeAnimations', [
        transition('* <=> *', [
          query(':enter, :leave', [
            style({
              position: 'absolute',
              left: 0,
              width: '100%',
            }),
          ]),
          group([
            query(':enter', [
              animate('2000ms ease', keyframes([
                style({ transform: 'scale(0) translateX(100%)', offset: 0 }),
                style({ transform: 'scale(0.5) translateX(25%)', offset: 0.3 }),
                style({ transform: 'scale(1) translateX(0%)', offset: 1 }),
              ])),
            ], { optional: true }),
            query(':leave', [
              animate('2000ms ease', keyframes([
                style({ transform: 'scale(1)', offset: 0 }),
                style({ transform: 'scale(0.5) translateX(-25%) rotate(0)', offset: 0.35 }),
                style({ opacity: 0, transform: 'translateX(-50%) rotate(-180deg) scale(6)', offset: 1 }),
              ])),
            ], { optional: true })
          ]),
        ])
      ])
  
      public readonly slider =
      trigger('routeAnimations', [
        transition('* <=> *', [
          query(':enter, :leave', [
            style({
              position: 'absolute',
              left: 0,
              width: '100%',
            })
          ], { optional: true }),
          query(':enter', [
            style({ left: '-100%', opacity: 0 })
          ], { optional: true }),
          group([
            query(':leave', [
              animate('500ms ease', style({ left: '100%', opacity: 0 }))
            ], { optional: true }),
            query(':enter', [
              animate('500ms ease', style({ left: '0%', opacity: 1 }))
            ], { optional: true })
          ]),
          // Required only if you have child animations on the page
          query(':leave', animateChild(), { optional: true }),
          query(':enter', animateChild(), { optional: true }),
        ]),
      ])
  
      public readonly fader =
      trigger('routeAnimations', [
        transition('* <=> *', [
          query(':enter, :leave', [
            style({ opacity: 0 }),
          ]),
          // Animate the new page in
          query(':enter', [
            animate('600ms ease', style({ opacity: 1 })),
          ])
        ]),
      ])
  
  }
  
  export const Animation = new AnimationService()
  