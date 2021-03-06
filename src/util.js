'use strict';

function LifecycleSubjects(createEventSubject) {
  // Expose observables like properties
  this.componentWillMount = createEventSubject();
  this.componentDidMount = createEventSubject();
  this.componentWillReceiveProps = createEventSubject();
  this.componentWillUpdate = createEventSubject();
  this.componentDidUpdate = createEventSubject();
  this.componentWillUnmount = createEventSubject();
}

module.exports = {
  digestDefinitionFnOutput: function digestDefinitionFnOutput(output) {
    var vtree$;
    var onMount;
    var dispose;
    var customEvents;
    if (output && output.hasOwnProperty('view') &&
      typeof output.view.subscribe === 'function')
    {
      vtree$ = output.view;
      onMount = output.onMount;
      dispose = output.dispose;
      customEvents = output.events;
    } else if (output && typeof output.subscribe === 'function') {
      vtree$ = output;
    } else {
      throw new Error(
        'definitionFn given to render or component must return an ' +
        'Observable of React elements, or an object containing such ' +
        'Observable named as `view`');
    }
    return {
      vtree$: vtree$,
      onMount: onMount,
      dispose: dispose,
      customEvents: customEvents || {}
    };
  },
  createLifecycleSubjects: function createLifecycleSubjects(createEventSubject) {
    return new LifecycleSubjects(createEventSubject);
  }
};
