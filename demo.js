$(document).ready(function() {
  var persons = Immutable.List([{name: 'Adam', car:'Alpha Romeo'},{name: 'Barry', car:'BMW'},{name: 'Chris', car:'Chevrolet'}]);

  T.register(window);

  //If T.register() is called without window, do this:
  var result = T.ul(
    persons.slice(0,2).map(p => 
      T.li({'class':'red', 'style':{'font-weight': 'bold'}}, p.name)
    )
  );
 
  var result1 = ul(
    persons.slice(0,2).map(p => 
      li({'class':'red', 'style':{'font-weight': 'bold'}}, span(p.name))
    )
  );

  var result2 = div([
    span(['Name:', b(persons.get(0).name)]),
    br(),
    span(['Car:', b(persons.get(0).car)])
  ])

  var result3 = table({'style':{'border':'1px solid'}},
    persons.unshift({'name':'NAME', 'car':'CAR'}).
    map((person, i) => tr(
      [person.name, person.car].map(cell => i == 0 ? th(cell) : td(cell))
    ))
  );
  
  T.setChildren('container', [result, result1, result2, br(), result3]);
});

